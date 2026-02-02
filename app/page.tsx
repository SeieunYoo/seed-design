"use client";

import * as React from "react";
import { StarRating } from "@/components/star-rating";

interface Review {
  id: string;
  rating: number;
  content: string;
  createdAt: Date;
}

export default function ReviewPage() {
  const [rating, setRating] = React.useState(0);
  const [content, setContent] = React.useState("");
  const [reviews, setReviews] = React.useState<Review[]>([]);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasAttemptedSubmit(true);

    if (rating === 0) {
      return;
    }

    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    const newReview: Review = {
      id: Date.now().toString(),
      rating,
      content,
      createdAt: new Date(),
    };

    setReviews((prev) => [newReview, ...prev]);
    setRating(0);
    setContent("");
    setIsSubmitting(false);
    setHasAttemptedSubmit(false);
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    if (hasAttemptedSubmit && newRating > 0) {
      setHasAttemptedSubmit(false);
    }
  };

  const showRatingError = hasAttemptedSubmit && rating === 0;

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#F5F5F7",
      padding: "24px",
    }}>
      <div style={{
        maxWidth: "600px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}>
        {/* Header */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          padding: "24px 0",
        }}>
          <h1 style={{
            fontSize: "24px",
            fontWeight: 700,
            color: "#1a1a1a",
            margin: 0,
            textAlign: "center",
          }}>
            후기 작성
          </h1>
          <p style={{
            fontSize: "14px",
            color: "#8E8E93",
            margin: 0,
            textAlign: "center",
          }}>
            서비스 이용 경험을 공유해 주세요
          </p>
        </div>

        {/* Review Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "16px",
            padding: "24px",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}>
            <StarRating
              label="별점"
              description="서비스에 대한 만족도를 선택해 주세요"
              value={rating}
              onValueChange={handleRatingChange}
              size="large"
              invalid={showRatingError}
              errorMessage={showRatingError ? "별점을 선택해 주세요" : undefined}
              showRequiredIndicator
              required
            />

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#1a1a1a",
              }}>
                후기 내용
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="서비스 이용 후기를 자유롭게 작성해 주세요..."
                rows={4}
                maxLength={500}
                style={{
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid #E5E5EA",
                  fontSize: "14px",
                  resize: "vertical",
                  fontFamily: "inherit",
                  outline: "none",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#007AFF";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#E5E5EA";
                }}
              />
              <p style={{
                fontSize: "12px",
                color: "#8E8E93",
                margin: 0,
                textAlign: "right",
              }}>
                {content.length}/500
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                backgroundColor: "#007AFF",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "12px",
                padding: "14px 20px",
                fontSize: "16px",
                fontWeight: 600,
                cursor: isSubmitting ? "not-allowed" : "pointer",
                opacity: isSubmitting ? 0.7 : 1,
                transition: "all 0.2s ease",
              }}
            >
              {isSubmitting ? "등록 중..." : "후기 등록하기"}
            </button>
          </div>
        </form>

        {/* Reviews List */}
        {reviews.length > 0 && (
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}>
            <h2 style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "#1a1a1a",
              margin: 0,
            }}>
              작성된 후기 ({reviews.length})
            </h2>

            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}>
              {reviews.map((review) => (
                <div
                  key={review.id}
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "12px",
                    padding: "16px",
                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}>
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}>
                      <StarRating
                        value={review.rating}
                        readOnly
                        size="small"
                      />
                      <span style={{
                        fontSize: "12px",
                        color: "#8E8E93",
                      }}>
                        {review.createdAt.toLocaleDateString("ko-KR")}
                      </span>
                    </div>
                    {review.content && (
                      <p style={{
                        fontSize: "14px",
                        color: "#3C3C43",
                        margin: 0,
                        lineHeight: 1.5,
                      }}>
                        {review.content}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {reviews.length === 0 && (
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            padding: "32px 0",
          }}>
            <p style={{
              fontSize: "14px",
              color: "#8E8E93",
              margin: 0,
            }}>
              아직 작성된 후기가 없습니다
            </p>
            <p style={{
              fontSize: "12px",
              color: "#AEAEB2",
              margin: 0,
            }}>
              첫 번째 후기를 남겨보세요
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
