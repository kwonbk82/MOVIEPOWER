package com.power.movie_ranger.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.power.movie_ranger.constant.Accompany;
import com.power.movie_ranger.dto.ReviewUpdateDto;
import com.power.movie_ranger.dto.ReviewWriteDto;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

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
    private int liked = 0;

    @OneToMany(mappedBy = "review", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ReviewLike> reviewLikes = new ArrayList<>();

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Accompany accompany;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private Integer report;

    @OneToMany(mappedBy = "review",cascade = CascadeType.ALL, orphanRemoval = true )
    private List<ReviewReport> reviewReports = new ArrayList<>();

    private boolean isModified = false;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties({"reviews", "password","inquiries","wishlists"})
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

    public void updateReview(ReviewUpdateDto dto,User user){
        if(!this.user.getId().equals(user.getId())){
            throw new IllegalArgumentException("수정 권한이 없습니다.");
        }

        // 1. content 변경 체크
        if (!Objects.equals(this.content, dto.getContent())) {
            this.content = dto.getContent();
            this.isModified = true;
        }

// 2. star 변경 체크 (null이 아닐 때만 업데이트한다고 하셨으니 조건 추가)
        if (dto.getStar() != null && !Objects.equals(this.star, dto.getStar())) {
            this.star = dto.getStar();
            this.isModified = true;
        }

// 3. date 변경 체크
        if (dto.getDate() != null && !Objects.equals(this.date, dto.getDate())) {
            this.date = dto.getDate();
            this.isModified = true;
        }

// 4. accompany 변경 체크
        if (dto.getAccompany() != null && !Objects.equals(this.accompany, dto.getAccompany())) {
            this.accompany = dto.getAccompany();
            this.isModified = true;
        }
    }

    public void increaseLikedCount(ReviewLike reviewLike){
        this.reviewLikes.add(reviewLike);
        this.liked += 1;
    }

    public void decreaseLikedCount(ReviewLike reviewLike){
        this.reviewLikes.remove(reviewLike);
        this.liked -= 1;
    }

    public void increaseReportCount(ReviewReport reviewReport){
        this.reviewReports.add(reviewReport);
        this.report +=1;
    }
    public void decreaseReportCount(ReviewReport reviewReport){
        this.reviewReports.remove(reviewReport);
        this.report -=1;
    }

}
