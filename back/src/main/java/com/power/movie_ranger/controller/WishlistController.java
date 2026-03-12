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

    @PostMapping("/toggle")
    public ResponseEntity<?> toggleWishlist(@AuthenticationPrincipal CustomUserDetails userDetails,
                                               @Valid @RequestBody WishlistDto dto){
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
        }

        boolean liked = wishlistService.toggleWishlist(dto, userDetails.getId());

        return ResponseEntity.ok(liked);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> isWishlistExists(@AuthenticationPrincipal CustomUserDetails userDetails,
                                                @PathVariable("id") Long targetId,
                                              @RequestParam("targetType") TargetType targetType){
        if (userDetails == null) {
            return ResponseEntity.ok(false);
        }
        boolean isExists = wishlistService.isWishlist(userDetails.getId(),targetId,targetType);
        return ResponseEntity.ok(isExists);
    }
}
