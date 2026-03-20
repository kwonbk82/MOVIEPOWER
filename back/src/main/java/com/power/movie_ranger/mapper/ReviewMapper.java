package com.power.movie_ranger.mapper;

import com.power.movie_ranger.dto.ReviewShowDto;
import com.power.movie_ranger.entity.Review;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring") // 스프링 빈으로 등록
public interface ReviewMapper {

    // 필드명이 같으면 자동으로 매핑됩니다.
    // 필드명이 다른 경우만 @Mapping으로 지정해줍니다.
    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "nickName", source = "user.nickName")
    @Mapping(target = "profileImg", source = "user.profileImg")
    @Mapping(source = "modified", target = "modified")
    ReviewShowDto entityToDto(Review review);

    // 리스트 변환도 메서드만 선언하면 자동으로 구현됩니다.
    List<ReviewShowDto> entityToDtoList(List<Review> reviews);
}
