package com.power.movie_ranger.entity;

import com.power.movie_ranger.constant.TargetType;
import com.power.movie_ranger.dto.WishlistDto;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;


@Entity
@Getter
@ToString
@Table(name="tb_wishlist",uniqueConstraints = {
        @UniqueConstraint(columnNames = {"user_id", "targetId", "targetType"})})
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Wishlist {
    @Id
    @Column(name="wishlist_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false)
    private Long targetId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TargetType targetType;

    public static Wishlist createWishlist(WishlistDto dto, User user){
        Wishlist wishlist = new Wishlist();

        wishlist.user = user;
        wishlist.targetId = dto.getTargetId();
        wishlist.targetType = dto.getTargetType();

        return wishlist;
    }

}
