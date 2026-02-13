package com.power.movie_ranger.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.power.movie_ranger.constant.Accompany;
import com.power.movie_ranger.dto.ReviewWriteDto;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDate;

@Entity
@Getter
@ToString
@Table(name="tb_review")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Review extends BaseEntity{
    @Id
    @Column(name="review_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long movieId;

    @Column(nullable = false)
    private Integer star;

    @Column(nullable = false)
    private Integer liked;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Accompany accompany;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private Integer report;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties({"reviews", "password","inquiries"})
    private User user;

    public static Review createReview(ReviewWriteDto dto,User user){
        Review review = new Review();

        review.movieId = dto.getMovieId();
        review.star = dto.getStar();
        review.liked = 0;
        review.report = 0;
        review.accompany = dto.getAccompany();
        review.date= dto.getDate();
        review.content=dto.getContent();

        review.user = user;

        return review;
    }


}
