package com.power.movie_ranger.repository;

import com.power.movie_ranger.entity.Inquiry;
import com.power.movie_ranger.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InquiryRepository extends JpaRepository<Inquiry, Long> {
    List<Inquiry> findByUserId(Long userId);

}
