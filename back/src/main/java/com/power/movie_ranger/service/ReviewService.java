package com.power.movie_ranger.service;

import com.power.movie_ranger.dto.ReviewShowDto;
import com.power.movie_ranger.dto.ReviewUpdateDto;
import com.power.movie_ranger.dto.ReviewWriteDto;
import com.power.movie_ranger.entity.Review;
import com.power.movie_ranger.entity.ReviewLike;
import com.power.movie_ranger.entity.ReviewReport;
import com.power.movie_ranger.entity.User;
import com.power.movie_ranger.mapper.ReviewMapper;
import com.power.movie_ranger.repository.ReviewLikeRepository;
import com.power.movie_ranger.repository.ReviewReportRepository;
import com.power.movie_ranger.repository.ReviewRepository;
import com.power.movie_ranger.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class ReviewService {
    private final UserRepository userRepository;
    private final ReviewRepository reviewRepository;
    private final ReviewMapper reviewMapper;
    private final ReviewLikeRepository reviewLikeRepository;
    private final ReviewReportRepository reviewReportRepository;


    public Long createReview(ReviewWriteDto dto, Long id){
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("해당 아이디의 유저가 없습니다."));

        Review review= Review.createReview(dto,user);

        return reviewRepository.save(review).getId();
    }

    public Long updateReview(ReviewUpdateDto dto, Long id, Long userId){
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 리뷰가 없습니다."));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("해당 아이디의 유저가 없습니다."));

        review.updateReview(dto,user);

        return review.getId();
    }

    public void deleteReview(Long id,Long userId){
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 리뷰가 없습니다."));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("해당 아이디의 유저가 없습니다."));


        if (!user.canManage(review)) {
            throw new IllegalArgumentException("권한이 없습니다.");
        }
        reviewRepository.delete(review);
    }

    public List<ReviewShowDto> showReviews(Long userId) {
            // 1. 엔티티 리스트 조회
        List<Review> reviews = reviewRepository.findByUserId(userId);

            // 2. Mapper로 한 방에 변환!
        return reviewMapper.entityToDtoList(reviews);
    }

    public List<ReviewShowDto> showMovieReviews(Long movieId){
        List<Review> reviews = reviewRepository.findByMovieId(movieId);
        return reviewMapper.entityToDtoList(reviews);
    }

    public int handleLikedCount(Long reviewId, Long userId){
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new IllegalArgumentException("해당 리뷰가 없습니다."));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("해당 아이디의 유저가 없습니다."));

        Optional<ReviewLike> existsLiked = reviewLikeRepository.findByUserAndReview(user,review);

        if(existsLiked.isPresent()){
            review.decreaseLikedCount(existsLiked.get());
        }else {
            ReviewLike reviewLike = new ReviewLike(user,review);
            review.increaseLikedCount(reviewLike);
        }

        return review.getLiked();
    }

    public int handleReportedCount(Long reviewId, Long userId){
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new IllegalArgumentException("해당 리뷰가 없습니다."));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("해당 아이디의 유저가 없습니다."));

        Optional<ReviewReport> existsReported = reviewReportRepository.findByUserAndReview(user,review);

        if(existsReported.isPresent()){
            review.decreaseReportCount(existsReported.get());
        }else {
            ReviewReport reviewReport = new ReviewReport(user,review);
            review.increaseReportCount(reviewReport);
        }

        return review.getReport();
    }


}
