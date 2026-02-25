package com.power.movie_ranger.repository;

import com.power.movie_ranger.constant.TargetType;
import com.power.movie_ranger.dto.WishlistDto;
import com.power.movie_ranger.entity.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WishlistRepository extends JpaRepository<Wishlist,Long> {
    List<Wishlist> findByUserId(Long userId);
    boolean existsByUserIdAndTargetIdAndTargetType(Long userId, Long targetId,TargetType targetType);
    void deleteByUserIdAndTargetIdAndTargetType(Long userId, Long targetId, TargetType targetType);
}
