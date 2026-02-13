package com.power.movie_ranger.dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class InquiryWriteDto {

    @NotBlank
    private String title;

    @NotBlank
    private String content;

}
