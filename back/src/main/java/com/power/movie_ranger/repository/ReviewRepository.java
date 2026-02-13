package com.power.movie_ranger.repository;

import com.power.movie_ranger.entity.Review;
import com.power.movie_ranger.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findByUserId(Long userId);}
