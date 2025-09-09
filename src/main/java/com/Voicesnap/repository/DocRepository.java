package com.Voicesnap.repository;

import com.Voicesnap.entity.DocEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DocRepository extends JpaRepository<DocEntity, Long> {
    List<DocEntity> findByUserId(Long userId);
}
