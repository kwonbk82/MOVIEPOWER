package com.power.movie_ranger.repository;

import com.power.movie_ranger.entity.Review;
import com.power.movie_ranger.entity.ReviewLike;
import com.power.movie_ranger.entity.ReviewReport;
import com.power.movie_ranger.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReviewReportRepository extends JpaRepository<ReviewReport,Long> {
    Optional<ReviewReport> findByUserAndReview(User user, Review review);

}
