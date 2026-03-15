package com.power.movie_ranger.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@ToString
@Table(name="tb_reviewReport")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReviewReport {
    @Id
    @Column(name="reviewReport_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "review_id")
    private Review review;

    public ReviewReport(User user, Review review) {
        this.user = user;
        this.review = review;
    }
}
