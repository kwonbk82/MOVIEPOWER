package com.power.movie_ranger.dto;

import com.power.movie_ranger.constant.TargetType;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WishlistDto {
    private Long id;
    private Long userId;
    private Long targetId;
    private TargetType targetType;
}
