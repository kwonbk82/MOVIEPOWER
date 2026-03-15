package com.power.movie_ranger.service;

import com.power.movie_ranger.dto.ReviewShowDto;
import com.power.movie_ranger.entity.Review;
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
public class AdminService {
    private final UserRepository userRepository;
    private final ReviewRepository reviewRepository;
    private final ReviewMapper reviewMapper;

    public List<ReviewShowDto> showReportedReview(Integer report){
        List<Review> reportedReview = reviewRepository.findReportedReview(report);

        return reviewMapper.entityToDtoList(reportedReview);
    }

}
