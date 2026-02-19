package com.power.movie_ranger.controller;

import com.power.movie_ranger.config.security.CustomUserDetails;
import com.power.movie_ranger.dto.ReviewShowDto;
import com.power.movie_ranger.dto.ReviewWriteDto;
import com.power.movie_ranger.dto.UserInfoDto;
import com.power.movie_ranger.service.ReviewService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/review")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping("/create")
    public ResponseEntity<?> createReview(@AuthenticationPrincipal CustomUserDetails userDetails,
                                            @Valid @RequestBody ReviewWriteDto dto) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
        }
        // 1. 커스텀 객체에서 PK(ID)만 쏙 뽑습니다.
        Long userId = reviewService.createReview(dto, userDetails.getId());

        return ResponseEntity.ok(userId);
    }

    @GetMapping("/movie/{id}")
    public ResponseEntity<?> showMovieReviews(@PathVariable("id") @Min(1) Long movieId){
        List<ReviewShowDto> reviews = reviewService.showMovieReviews(movieId);
        return ResponseEntity.ok(reviews);
    }
}
