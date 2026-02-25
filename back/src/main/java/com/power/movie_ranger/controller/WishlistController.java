package com.power.movie_ranger.controller;

import com.power.movie_ranger.config.security.CustomUserDetails;
import com.power.movie_ranger.constant.TargetType;
import com.power.movie_ranger.dto.ReviewWriteDto;
import com.power.movie_ranger.dto.WishlistDto;
import com.power.movie_ranger.service.ReviewService;
import com.power.movie_ranger.service.WishlistService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/wishlist")
@RequiredArgsConstructor
public class WishlistController {
    private final WishlistService wishlistService;
    private final ReviewService reviewService;

    @PostMapping("/create")
    public ResponseEntity<?> createWishlist(@AuthenticationPrincipal CustomUserDetails userDetails,
                                               @Valid @RequestBody WishlistDto dto){
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
        }

        Long userId = wishlistService.createWishlist(dto, userDetails.getId());

        return ResponseEntity.ok(userId);
    }

    @GetMapping("/check/{targetId}")
    public ResponseEntity<Boolean> checkWishlist(@AuthenticationPrincipal CustomUserDetails userDetails,
                                                 @RequestParam Long targetId,
                                                 @RequestParam TargetType targetType){
        if (userDetails == null) {
            return ResponseEntity.ok(false);
        }
        Boolean wishlist = wishlistService.isWishlist(userDetails.getId(), targetId,targetType);
        return ResponseEntity.ok(wishlist);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteWishlist(@RequestParam Long targetId,
                                            @RequestParam TargetType targetType,
                                            @AuthenticationPrincipal CustomUserDetails userDetails){
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
        }
        wishlistService.deleteWishlist(userDetails.getId(),targetId,targetType);
        return ResponseEntity.ok("찜 해제 성공");
    }
}
