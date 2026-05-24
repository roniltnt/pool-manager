package com.example.asgardchallenge.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
public class Teacher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ElementCollection(fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING)
    private Set<SwimmingStyle> supportedStyles;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<TimeWindow> availability;

    public Teacher(String name, Set<SwimmingStyle> supportedStyles, List<TimeWindow> availability) {
        this.name = name;
        this.supportedStyles = supportedStyles;
        this.availability = availability;
    }
}
