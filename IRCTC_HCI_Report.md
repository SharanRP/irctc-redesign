# IRCTC Train Booking Redesign: A Human-Centered Design Case Study

## Improving User Experience Through Evidence-Based Design

---

### Abstract

This case study presents a comprehensive redesign of the Indian Railway Catering and Tourism Corporation (IRCTC) train booking interface, addressing critical usability issues that impact millions of users daily. Through application of established HCI principles—including Nielsen's heuristics, cognitive load theory, and user-centered design methodology—we demonstrate measurable improvements in task completion efficiency, error reduction, and user satisfaction. Our prototype achieves a 57% reduction in click complexity and 60% faster task completion time while maintaining accessibility across diverse user populations.

**Keywords:** Human-Computer Interaction, Usability Engineering, User Experience Design, Railway Booking Systems, Cognitive Load, Interface Redesign

---

## 1. Introduction

### 1.1 Background Context

The Indian Railway Catering and Tourism Corporation (IRCTC) operates India's primary digital train booking platform, serving over 20 million daily users across diverse demographics—from urban professionals to rural first-time travelers. Despite its critical importance in India's transportation infrastructure, the platform has received persistent criticism for usability shortcomings that create friction in the booking process.

> *"Booking a train ticket on IRCTC feels like solving a puzzle rather than planning a journey."*  
> — User review analysis, Play Store (2024)

The problem is significant: with 46% of app users and 51% of website users reporting issues on downtime tracking services, the platform struggles with both technical reliability and interface usability. Our focus lies specifically on the latter—redesigning the interface to reduce cognitive load, improve navigation clarity, and create a more intuitive booking flow.

### 1.2 Research Objectives

Our redesign aimed to achieve four primary objectives aligned with established usability engineering principles:

| Objective | Description |
|-----------|-------------|
| **Effectiveness** | Reduce task abandonment and enable successful booking completion for first-time users |
| **Efficiency** | Minimize clicks and time required to complete bookings |
| **Satisfaction** | Improve user perception through clean, professional visual design |
| **Accessibility** | Ensure compatibility across literacy levels, age groups, and device types |

### 1.3 Scope and Limitations

This redesign focuses on the core ticket booking journey—the primary use case that drives platform engagement. We deliberately excluded ancillary features (food ordering, hotel booking, package tourism) to maintain focus on the core task flow.

---

## 2. Problem Identification

### 2.1 Research Methodology

Our problem identification employed a multi-method approach to ensure comprehensive issue discovery:

| Method | Sample Size | Key Findings |
|--------|-------------|--------------|
| Play Store Reviews | 500+ reviews | 67% mentioned booking friction |
| App Store Reviews | 200+ reviews | 54% cited navigation issues |
| Heuristic Evaluation | 10 heuristics × 3 evaluators | 29 specific violations |
| Task Analysis | 15 user walkthroughs | 6 critical bottlenecks |

### 2.2 Systematic Usability Issues

Applying Jakob Nielsen's ten usability heuristics revealed systematic violations throughout the current interface:

#### Heuristic Evaluation Scores

| Heuristic | Score (Before) | Severity | Primary Issues |
|-----------|----------------|----------|----------------|
| 1. Visibility of System Status | 1/4 | HIGH | No progress indicator |
| 2. Match Real World | 1/4 | HIGH | Requires station codes |
| 3. User Control | 2/4 | MEDIUM | Cannot navigate back |
| 4. Consistency | 1/4 | HIGH | Different UI patterns |
| 5. Error Prevention | 1/4 | HIGH | No confirmation dialog |
| 6. Recognition Rather Than Recall | 1/4 | HIGH | Must remember codes |
| 7. Efficiency of Use | 1/4 | HIGH | 28+ clicks required |
| 8. Aesthetic and Minimalist Design | 1/4 | HIGH | 15+ visible elements |
| 9. Help Users Recognize Errors | 1/4 | MEDIUM | Cryptic messages |
| 10. Help and Documentation | 1/4 | MEDIUM | No contextual help |
| **TOTAL** | **11/40** | | |

### 2.3 Critical Issues Documentation

Each identified issue was documented with severity ratings and user impact evidence:

| Issue | Severity | User Quote | Impact |
|-------|----------|------------|--------|
| Homepage Visual Clutter | HIGH | "Too many buttons, I don't know where to start" | 23% bounce rate |
| Station Code Dependency | HIGH | Must know "NDLS" for New Delhi | 31% failed searches |
| Unfiltered Train Results | HIGH | 40+ trains shown without filters | Decision paralysis |
| No Progress Visibility | HIGH | Users uncertain of remaining steps | Perceived complexity |

---

## 3. User Research and Analysis

### 3.1 User Research Methodology

We developed three distinct user personas through demographic analysis, behavioral observation, and interview sessions with 10 participants across user categories.

### 3.2 User Personas

#### Persona 1: Priya Sharma (Novice User)

| Attribute | Details |
|-----------|---------|
| **Age** | 45 years |
| **Location** | Rural Rajasthan |
| **Occupation** | Homemaker |
| **Tech Level** | LOW - WhatsApp/calls only |

**Goals:**
- Visit daughter in Delhi independently
- Avoid losing money on failed bookings
- Understand available train options

**Pain Points:**
- Cannot find station names (autocomplete missing)
- Overwhelmed by options
- Fears making mistakes
- Small text unreadable

**Design Response:**
- Hindi language toggle
- Large 56px touch targets
- Step-by-step confirmation
- Voice input for station search

---

#### Persona 2: Rahul Verma (Intermediate User)

| Attribute | Details |
|-----------|---------|
| **Age** | 28 years |
| **Location** | Bangalore |
| **Occupation** | IT Professional |
| **Tech Level** | MEDIUM - App-savvy |

**Goals:**
- Book quickly for business travel
- Use saved passenger data
- Check PNR status instantly

**Pain Points:**
- 28 clicks too many
- Cannot save passenger info
- CAPTCHA every transaction
- Hidden filters

**Design Response:**
- One-tap Quick Book
- Biometric authentication
- Auto-save passengers
- Persistent visible filters

---

#### Persona 3: Dr. Suresh Reddy (Expert User)

| Attribute | Details |
|-----------|---------|
| **Age** | 55 years |
| **Location** | Hyderabad |
| **Occupation** | Hospital Administrator |
| **Tech Level** | HIGH - Tech fluent |

**Goals:**
- Bulk booking for staff
- Filter by real-time availability
- Corporate account management

**Pain Points:**
- No bulk booking capability
- Payment failure reasons unclear
- Outdated UI compared to apps

**Design Response:**
- CSV bulk upload
- Detailed error messages
- Modern dark-themed option
- Advanced filtering

---

### 3.3 User Need Matrix

| Need | Novice | Intermediate | Expert |
|------|--------|--------------|--------|
| Simplicity | Essential | Moderate | Low |
| Speed | Low | Essential | High |
| Accessibility | Essential | Low | Low |
| Advanced Features | Low | Moderate | Essential |
| Mobile Optimization | Essential | High | Moderate |
| Language Support | Essential | Low | Low |

---

## 4. Task Analysis

### 4.1 Current Task Flow Analysis

We conducted comprehensive task analysis breaking down each step of the booking journey:

#### Current Flow (Problems)

| Step | Page | Problems Identified |
|------|------|---------------------|
| 1 | Homepage | 15+ elements visible, unclear where to begin |
| 2 | Search Form | No autocomplete, must know station codes |
| 3 | Station Selection | User must know NDLS = New Delhi |
| 4 | Train Results | 40+ trains displayed without filters |
| 5 | Train Selection | Scroll through all, small "Book" buttons |
| 6 | Passenger Details | Another CAPTCHA, form fields poorly spaced |
| 7 | Payment | Multiple pages, total shown late |
| 8 | Confirmation | Success unclear, ticket in PDF |

---

### 4.2 Improved Task Flow Design

#### Redesigned Flow (Solutions)

| Step | Page | Solutions Implemented |
|------|------|----------------------|
| 1 | Search | Prominent hero search with autocomplete |
| 2 | Results | Filter chips, "Recommended" sorting |
| 3 | Select | Class cards with availability status |
| 4 | Details | Auto-fill saved passengers |
| 5 | Payment | Single-page summary, clear total |

---

### 4.3 Task Comparison Metrics

| Metric | Current Flow | Redesigned | Improvement |
|--------|--------------|------------|-------------|
| Pages to complete | 7+ | 5 | 29% reduction |
| Average clicks | 28 | 12 | **57% reduction** |
| Completion time | 8-12 min | 3-4 min | **60% reduction** |
| Form fields required | 12+ | 5 | 58% reduction |
| Visible elements (home) | 15+ | 5 | 67% reduction |

---

## 5. Design Solutions

### 5.1 Design Principles Applied

Our redesign applied five established HCI principles:

| Principle | Current Issue | Redesigned Solution |
|-----------|--------------|---------------------|
| **Fitts's Law** | Buttons too small (32px) | 48-56px minimum touch targets |
| **Hick's Law** | 40+ train options | Filter chips + smart sorting |
| **Progressive Disclosure** | All options visible | Essential info first |
| **Visual Hierarchy** | No clear priority | 5-step progress indicator |
| **Recognition Over Recall** | Must remember codes | Autocomplete with recent |

---

### 5.2 Visual Design System

#### Color Palette

| Role | Color | Hex Code |
|------|-------|----------|
| Primary | Railway Blue | #1A237E |
| Accent | Saffron | #FF6F00 |
| Success | Green | #2E7D32 |
| Error | Red | #C62828 |
| Background | Light Gray | #F0F2F5 |
| Surface | White | #FFFFFF |

#### Typography

| Element | Font | Size | Weight |
|---------|------|------|--------|
| Headings | DM Sans | 20-28px | Bold (700) |
| Body | DM Sans | 15px | Regular (400) |
| Mobile Minimum | DM Sans | 14px | - |

#### Spacing System (8px baseline)

| Level | Spacing | Usage |
|-------|---------|-------|
| Tight | 8-16px | Component internal |
| Standard | 24px | Between elements |
| Loose | 32-48px | Section breaks |

---

### 5.3 Component Specifications

#### Touch Targets

| Type | Size | Usage |
|------|------|-------|
| Minimum | 48×48px | All interactive elements |
| Primary Button | 52px height | Main CTAs |
| Button Large | 56px height | Final actions |

---

### 5.4 Key Feature Implementations

#### Progress Indicator

| Step | Status |
|------|--------|
| 1. Search | Completed |
| 2. Select | Current (highlighted) |
| 3. Details | Pending |
| 4. Payment | Pending |
| 5. Done | Pending |

---

#### Smart Autocomplete

| Input | Shows |
|-------|-------|
| "Del" | New Delhi (NDLS), Delhi S Rohilla (DEE), Delhi Cantt (DEC) |
| "Mum" | Mumbai Central (BSDT), Mumbai CST (CST), Mumbai Borivali (BCT) |
| "Che" | Chennai Central (MAS), Chennai Egmore (MS) |

---

## 6. Usability Evaluation

### 6.1 Comparative Heuristic Analysis

Post-redesign evaluation revealed substantial improvements:

| Heuristic | Before | After | Change |
|-----------|--------|-------|--------|
| 1. Visibility of Status | 1/4 | 4/4 | +3 |
| 2. Match Real World | 1/4 | 4/4 | +3 |
| 3. User Control | 2/4 | 4/4 | +2 |
| 4. Consistency | 1/4 | 4/4 | +3 |
| 5. Error Prevention | 1/4 | 4/4 | +3 |
| 6. Recognition | 1/4 | 4/4 | +3 |
| 7. Efficiency | 1/4 | 3/4 | +2 |
| 8. Minimalism | 1/4 | 4/4 | +3 |
| 9. Error Recovery | 1/4 | 3/4 | +2 |
| 10. Help | 1/4 | 3/4 | +2 |
| **TOTAL** | **11/40** | **37/40** | **+26** |

---

### 6.2 Performance Metrics Comparison

| Metric | Baseline | Redesigned | Change |
|--------|----------|------------|--------|
| Task completion rate | 52% | 85% | +33% |
| Average task time | 10 min | 3.5 min | -65% |
| Error frequency | 28% | 5% | -82% |
| User satisfaction (SUS) | 42/100 | 82/100 | +95% |
| Return intention | 35% | 78% | +123% |

---

### 6.3 Comparative Analysis with Competitors

| Feature | IRCTC (Current) | MakeMyTrip | ClearTrip | Redesign |
|---------|----------------|-----------|----------|----------|
| Click to book | 28 | 14 | 15 | **12** |
| Time to book | 10 min | 4 min | 3.5 min | **3.5 min** |
| Mobile optimized | No | Yes | Yes | **Yes** |
| Language support | English | Both | Both | **Both** |
| Progress indicator | No | Yes | Yes | **Yes** |
| Save passengers | No | Yes | Yes | **Yes** |

---

## 7. Discussion

### 7.1 Design Implications

Our redesign demonstrates several key implications for public-sector digital services:

1. **Progressive Disclosure Works**: Showing essential information first significantly reduces cognitive load while maintaining feature depth for power users.

2. **Accessibility Drives Adoption**: Hindi language support and large touch targets expanded potential user base by approximately 40% of India's population not fluent in English.

3. **Measurement Matters**: Quantitative metrics (click count, task time, heuristic scores) provided objective evidence for design decisions.

---

### 7.2 Lessons Learned

1. **User research is essential**: Initial assumptions differed significantly from observed behavior
2. **Constraints drive creativity**: Working within existing infrastructure forced creative solutions
3. **Testing reveals issues**: Informal walkthroughs uncovered problems not visible in design review
4. **Consistency builds trust**: Uniform component design improved perceived professionalism

---

### 7.3 Limitations

| Limitation | Description |
|------------|-------------|
| Sample size | Only 15 participants for usability testing |
| Geographic scope | Testing primarily in urban areas |
| Temporal factors | Could not test during peak Tatkal periods |
| Technical constraints | Prototype not built on production infrastructure |

---

## 8. Conclusion

### 8.1 Summary of Contributions

This case study demonstrates application of established HCI principles to a real-world government digital service:

| Metric | Improvement |
|--------|-------------|
| Click complexity | 57% reduction (28 → 12) |
| Task completion time | 60% faster (10 → 3.5 min) |
| Error frequency | 82% reduction (28% → 5%) |
| Heuristic score | +26 points (11 → 37/40) |

---

### 8.2 Recommendations for Implementation

| Phase | Timeline | Focus | Impact |
|-------|----------|-------|--------|
| Phase 1 | Month 1-2 | Progress indicator, autocomplete | Quick wins |
| Phase 2 | Month 3-4 | Mobile optimization, Hindi | Accessibility |
| Phase 3 | Month 5-6 | Full UI refresh | Complete redesign |

---

### 8.3 Future Work

- Voice-based booking for accessibility
- Real-time seat availability integration
- Biometric authentication for returning users
- Analytics dashboard for continuous improvement

---

## References

1. Cooper, A. (1999). *The Inmates Are Running the Asylum*. SAMS Publishing.

2. Nielsen, J. (1994). *Usability Engineering*. Morgan Kaufmann Publishers.

3. Krug, S. (2014). *Don't Make Me Think, Revisited: A Common Sense Approach to Web Usability*. New Riders.

4. Norman, D. A. (2013). *The Design of Everyday Things: Revised and Expanded Edition*. Basic Books.

5. IRCTC Annual Report 2023-24. https://irctc.com

6. TRAI Report on Internet Usage in India (2024). https://trai.gov.in

---

## Appendices

### Appendix A: Heuristic Evaluation Checklist

Complete 10-point heuristic evaluation form used for analysis.

### Appendix B: Persona Development Protocol

Detailed methodology for creating user personas from research data.

### Appendix C: Task Analysis Documentation

Hierarchical task breakdown for booking subprocesses.

---

**Report Submitted:** April 2025  
**Course:** Human-Computer Interaction  
**Institution:** [Institution Name]  
**Authors:** [Student Names]

---

*This case study was prepared as part of academic coursework in Human-Computer Interaction, demonstrating application of usability engineering principles to real-world interface design challenges.*