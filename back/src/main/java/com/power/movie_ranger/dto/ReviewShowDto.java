package com.power.movie_ranger.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.power.movie_ranger.constant.Accompany;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

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
    private String profileImg;
    private Integer report;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDateTime regTime;
    private boolean isModified;
}
