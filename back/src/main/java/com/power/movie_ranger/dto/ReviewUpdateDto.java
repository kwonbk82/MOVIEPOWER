package com.power.movie_ranger.dto;

import com.power.movie_ranger.constant.Accompany;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class ReviewUpdateDto {
    @NotNull
    @Min(1) @Max(5)
    private Integer star;

    @NotNull
    private LocalDate date;

    @NotNull
    private Accompany accompany;

    @NotBlank
    private String content;

    private boolean isModified;
}
