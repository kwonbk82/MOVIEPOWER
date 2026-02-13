package com.power.movie_ranger.controller;

import com.power.movie_ranger.config.security.CustomUserDetails;
import com.power.movie_ranger.dto.InquiryWriteDto;
import com.power.movie_ranger.dto.ReviewWriteDto;
import com.power.movie_ranger.service.InquiryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/inquiry")
@RequiredArgsConstructor
public class InquiryController {

    private final InquiryService inquiryService;

    @PostMapping("/create")
    public ResponseEntity<?> createInquiry(@AuthenticationPrincipal CustomUserDetails userDetails,
                                         @Valid @RequestBody InquiryWriteDto dto) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
        }
        // 1. 커스텀 객체에서 PK(ID)만 쏙 뽑습니다.
        Long userId = inquiryService.createInquiry(dto, userDetails.getId());

        return ResponseEntity.ok(userId);
    }

}
