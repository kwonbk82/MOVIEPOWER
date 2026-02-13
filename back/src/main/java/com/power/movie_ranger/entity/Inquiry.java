package com.power.movie_ranger.entity;

import com.power.movie_ranger.dto.InquiryWriteDto;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@ToString
@Table(name="tb_inquiry")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Inquiry extends BaseEntity{
    @Id
    @Column(name="inquiry_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private boolean processed = false;

    @Column
    private String inquiryImg;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public static Inquiry createInquiry(InquiryWriteDto dto,User user){
        Inquiry inquiry = new Inquiry();
        inquiry.title = dto.getTitle();
        inquiry.content = dto.getContent();
        inquiry.user = user;
        return inquiry;
    }

}
