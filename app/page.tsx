"use client";

import * as React from "react";
import { VStack, HStack, Text, Box } from "@seed-design/react";
import { StarRating } from "@/components/star-rating";
import { ActionButton } from "@/components/action-button";
import { TextField, TextFieldTextarea } from "@/components/text-field";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
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
  };

  return (
    <Box
      minHeight="100vh"
      backgroundColor="bg"
      padding="x6"
    >
      <VStack maxWidth="600px" marginX="auto" gap="x6">
        {/* Header */}
        <VStack gap="x2" alignItems="center" paddingY="x6">
          <Text fontSize="headline3" fontWeight="bold" textAlign="center">
            후기 작성
          </Text>
          <Text fontSize="body2" color="fg.neutral-muted" textAlign="center">
            서비스 이용 경험을 공유해 주세요
          </Text>
        </VStack>

        {/* Review Form */}
        <Box
          as="form"
          onSubmit={handleSubmit}
          backgroundColor="bg.layer-fill"
          borderRadius="x4"
          padding="x5"
          boxShadow="box-shadow-1"
        >
          <VStack gap="x5">
            <StarRating
              label="별점"
              description="서비스에 대한 만족도를 선택해 주세요"
              value={rating}
              onValueChange={setRating}
              size="large"
              invalid={rating === 0}
              errorMessage={rating === 0 ? "별점을 선택해 주세요" : undefined}
            />

            <TextField
              label="후기 내용"
              description="자세한 후기를 작성해 주세요"
              value={content}
              onValueChange={setContent}
              maxGraphemeCount={500}
            >
              <TextFieldTextarea
                placeholder="서비스 이용 후기를 자유롭게 작성해 주세요..."
                rows={4}
              />
            </TextField>

            <ActionButton
              type="submit"
              variant="brand-solid"
              size="large"
              layout="fill"
              loading={isSubmitting}
              disabled={rating === 0}
            >
              후기 등록하기
            </ActionButton>
          </VStack>
        </Box>

        {/* Reviews List */}
        {reviews.length > 0 && (
          <VStack gap="x4">
            <Text fontSize="headline4" fontWeight="bold">
              작성된 후기 ({reviews.length})
            </Text>

            <VStack gap="x3">
              {reviews.map((review) => (
                <Box
                  key={review.id}
                  backgroundColor="bg.layer-fill"
                  borderRadius="x3"
                  padding="x4"
                  boxShadow="box-shadow-1"
                >
                  <VStack gap="x3">
                    <HStack justifyContent="space-between" alignItems="center">
                      <StarRating
                        value={review.rating}
                        readOnly
                        size="small"
                      />
                      <Text fontSize="caption2" color="fg.neutral-muted">
                        {review.createdAt.toLocaleDateString("ko-KR")}
                      </Text>
                    </HStack>
                    {review.content && (
                      <Text fontSize="body2" color="fg.neutral">
                        {review.content}
                      </Text>
                    )}
                  </VStack>
                </Box>
              ))}
            </VStack>
          </VStack>
        )}

        {/* Empty State */}
        {reviews.length === 0 && (
          <VStack
            gap="x2"
            alignItems="center"
            paddingY="x8"
          >
            <Text fontSize="body1" color="fg.neutral-muted">
              아직 작성된 후기가 없습니다
            </Text>
            <Text fontSize="caption1" color="fg.neutral-muted">
              첫 번째 후기를 남겨보세요
            </Text>
          </VStack>
        )}
      </VStack>
    </Box>
  );
}
