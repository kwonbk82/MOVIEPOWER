package com.power.movie_ranger.repository;

import com.power.movie_ranger.entity.Review;
import com.power.movie_ranger.entity.ReviewLike;
import com.power.movie_ranger.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findByUserId(Long userId);
    List<Review> findByMovieId(Long movieId);

    @Query("SELECT r FROM Review r WHERE r.report >= 3")
    List<Review> findReportedReview(@Param("report") Integer report);
}
