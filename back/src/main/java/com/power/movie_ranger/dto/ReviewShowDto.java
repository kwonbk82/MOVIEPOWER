package com.power.movie_ranger.dto;

import com.power.movie_ranger.constant.Accompany;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class ReviewShowDto {
    private Long id;
    private Long movieId;
    private Integer star;
    private Integer liked;
    private Accompany accompany;
    private LocalDate date;
    private String content;
    private Long userId;
    private String nickName;
}
