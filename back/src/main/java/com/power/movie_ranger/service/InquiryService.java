package com.power.movie_ranger.service;

import com.power.movie_ranger.dto.InquiryShowDto;
import com.power.movie_ranger.dto.InquiryWriteDto;
import com.power.movie_ranger.dto.ReviewShowDto;
import com.power.movie_ranger.dto.ReviewWriteDto;
import com.power.movie_ranger.entity.Inquiry;
import com.power.movie_ranger.entity.Review;
import com.power.movie_ranger.entity.User;
import com.power.movie_ranger.mapper.InquiryMapper;
import com.power.movie_ranger.repository.InquiryRepository;
import com.power.movie_ranger.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class InquiryService {
    private final UserRepository userRepository;
    private final InquiryRepository inquiryRepository;
    private final InquiryMapper inquiryMapper;

    public Long createInquiry(InquiryWriteDto dto, Long id){
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("해당 아이디의 유저가 없습니다."));

        Inquiry inquiry= Inquiry.createInquiry(dto,user);

        return inquiryRepository.save(inquiry).getId();
    }

    public List<InquiryShowDto> showInquiry(Long userId) {
        // 1. 엔티티 리스트 조회
        List<Inquiry> inquiries = inquiryRepository.findByUserId(userId);

        // 2. Mapper로 한 방에 변환!
        return inquiryMapper.entityToDtoList(inquiries);
    }

}
