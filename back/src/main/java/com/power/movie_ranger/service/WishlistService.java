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

@Service
@Transactional
@RequiredArgsConstructor
public class WishlistService {

    private final WishlistRepository wishlistRepository;
    private final UserRepository userRepository;

    public Long createWishlist(WishlistDto dto, Long userId){
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("해당 아이디의 유저가 없습니다."));
        Wishlist wishlist = Wishlist.createWishlist(dto,user);

        return wishlistRepository.save(wishlist).getId();
    }

    public void deleteWishlist(Long userId, Long targetId, TargetType targetType){

        if (!userRepository.existsById(userId)) {
            throw new RuntimeException("유저 정보를 찾을 수 없습니다.");
        }

        wishlistRepository.deleteByUserIdAndTargetIdAndTargetType(userId,targetId,targetType);
    }

    public boolean isWishlist(Long userId, Long targetId,TargetType targetType){

        return wishlistRepository.existsByUserIdAndTargetIdAndTargetType(userId,targetId,targetType);
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
