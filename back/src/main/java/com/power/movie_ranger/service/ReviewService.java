package com.power.movie_ranger.service;

import com.power.movie_ranger.dto.ReviewShowDto;
import com.power.movie_ranger.dto.ReviewWriteDto;
import com.power.movie_ranger.entity.Review;
import com.power.movie_ranger.entity.User;
import com.power.movie_ranger.mapper.ReviewMapper;
import com.power.movie_ranger.repository.ReviewRepository;
import com.power.movie_ranger.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ReviewService {
    private final UserRepository userRepository;
    private final ReviewRepository reviewRepository;
    private final ReviewMapper reviewMapper;


    public Long createReview(ReviewWriteDto dto, Long id){
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("해당 아이디의 유저가 없습니다."));

        Review review= Review.createReview(dto,user);

        return reviewRepository.save(review).getId();
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

}
