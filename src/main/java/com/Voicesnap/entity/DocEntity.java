package com.Voicesnap.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "user_docs")
public class DocEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY) // Link with User entity
    @JoinColumn(name = "user_id", nullable = false)
    private User user;  

    private String filename;

    private String contentType;

    @Lob
    private byte[] data;
}
