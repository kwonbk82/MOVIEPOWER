package com.power.movie_ranger.controller;

import com.power.movie_ranger.config.security.CustomUserDetails;
import com.power.movie_ranger.dto.InquiryShowDto;
import com.power.movie_ranger.dto.ReviewShowDto;
import com.power.movie_ranger.dto.UserInfoDto;
import com.power.movie_ranger.dto.WishlistDto;
import com.power.movie_ranger.entity.Review;
import com.power.movie_ranger.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/mypage")
@RequiredArgsConstructor
public class MyPageController {
    private final UserService userService;
    private final MyPageService myPageService;
    private final ReviewService reviewService;
    private final InquiryService inquiryService;
    private final WishlistService wishlistService;

    @GetMapping("/info")
    public ResponseEntity<?> getMyInfo(@AuthenticationPrincipal CustomUserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
        }
        // 1. 커스텀 객체에서 PK(ID)만 쏙 뽑습니다.
        Long userId = userDetails.getId();

        // 2. 서비스에서 이 ID로 최신 정보를 가져옵니다. (DTO 반환 추천)
        UserInfoDto myPageInfo = myPageService.findMyPageInfo(userId);

        return ResponseEntity.ok(myPageInfo);
    }

    @GetMapping("/review")
    public ResponseEntity<?> getMyReviews(@AuthenticationPrincipal CustomUserDetails userDetails){
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
        }
        Long userId = userDetails.getId();

        List<ReviewShowDto> reviews = reviewService.showReviews(userId);

        return ResponseEntity.ok(reviews);
    }

    @GetMapping("/inquiry")
    public ResponseEntity<?> getMyInquiries(@AuthenticationPrincipal CustomUserDetails userDetails){
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
        }
        Long userId = userDetails.getId();

        List<InquiryShowDto> inquiries = inquiryService.showInquiry(userId);

        return ResponseEntity.ok(inquiries);
    }

    @GetMapping("/wishlist")
    public ResponseEntity<?> getMyWishlists(@AuthenticationPrincipal CustomUserDetails userDetails){
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
        }
        List<WishlistDto> wishlists = wishlistService.showWishlist(userDetails.getId());
        return ResponseEntity.ok(wishlists);
    }
}
