package com.power.movie_ranger.controller;

import com.power.movie_ranger.config.security.CustomUserDetails;
import com.power.movie_ranger.dto.ReviewShowDto;
import com.power.movie_ranger.service.AdminService;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class AdminController {
    private final AdminService adminService;

    @GetMapping("/review/reported")
    public ResponseEntity<?> showMovieReviews(@RequestParam("report") Integer report){

        List<ReviewShowDto> reviews = adminService.showReportedReview(report);
        return ResponseEntity.ok(reviews);
    }
}
