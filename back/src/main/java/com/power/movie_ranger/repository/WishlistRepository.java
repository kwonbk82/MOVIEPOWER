package com.power.movie_ranger.repository;

import com.power.movie_ranger.constant.TargetType;
import com.power.movie_ranger.dto.WishlistDto;
import com.power.movie_ranger.entity.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface WishlistRepository extends JpaRepository<Wishlist,Long> {
    List<Wishlist> findByUserId(Long userId);

    @Query("SELECT w FROM Wishlist w WHERE w.user.id=:userId AND w.targetId=:targetId AND w.targetType=:targetType")
    Optional<Wishlist> findWishlist(@Param("userId") Long userId,
                                    @Param("targetId") Long targetId,
                                    @Param("targetType") TargetType targetType);

    boolean existsByUserIdAndTargetIdAndTargetType(Long userId, Long targetId, TargetType targetType);

}
