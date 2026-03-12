package com.power.movie_ranger.service;

import com.power.movie_ranger.constant.TargetType;
import com.power.movie_ranger.dto.WishlistDto;
import com.power.movie_ranger.entity.User;
import com.power.movie_ranger.entity.Wishlist;
import com.power.movie_ranger.repository.UserRepository;
import com.power.movie_ranger.repository.WishlistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class WishlistService {

    private final WishlistRepository wishlistRepository;
    private final UserRepository userRepository;

    public boolean toggleWishlist(WishlistDto dto,Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        Optional<Wishlist> wishlist = wishlistRepository.findWishlist(
                user.getId(),
                dto.getTargetId(),
                dto.getTargetType()
        );
        if (wishlist.isPresent()) {
            wishlistRepository.delete(wishlist.get());
            return false;
        } else {
            Wishlist newWish = Wishlist.createWishlist(dto,user);
            wishlistRepository.save(newWish);
            return true;
        }
    }

    public boolean isWishlist(Long userId,Long targetId, TargetType targetType){

        return wishlistRepository.existsByUserIdAndTargetIdAndTargetType(
                userId
                ,targetId
                ,targetType);

    }

    public List<WishlistDto> showWishlist(Long userId){

        List<Wishlist> wishlists = wishlistRepository.findByUserId(userId);

        return wishlists.stream()
                .map(w->WishlistDto.builder()
                        .id(w.getId())
                        .userId(userId)
                        .targetId(w.getTargetId())
                        .targetType(w.getTargetType())
                        .build())
                .toList();

    }
}
