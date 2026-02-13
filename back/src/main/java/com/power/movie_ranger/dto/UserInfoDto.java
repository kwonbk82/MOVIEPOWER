package com.power.movie_ranger.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.power.movie_ranger.constant.Gender;
import com.power.movie_ranger.entity.BaseTimeEntity;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class UserInfoDto {
    private Long id;
    private String name;
    private String email;
    private String nickName;
    private Gender gender;
    private LocalDate birthDate;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDateTime regTime;
}
