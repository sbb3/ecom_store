import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useGetLatestProductsQuery } from "/src/redux/api/apiEndpoints/productApi";
import { HStack, Spinner } from "@chakra-ui/react";

const images2 = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
];

export default function ImageGalleryCaroussel() {
  const {
    data: products,
    isLoading,
    error,
  } = useGetLatestProductsQuery({ limit: 3 });

  if (isLoading) {
    return (
      <HStack justifyContent={"center"}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="purple.500"
          size="xl"
        />
      </HStack>
    );
  }

  const images = products?.map(({ imagesUrls }) => ({
    original: imagesUrls[0],
  }));

  return (
    <HStack
      overflow="hidden"
      // bg="red"
      w="full"
      h="full"
      p={2}
      justifyContent={"center"}
    >
      {error ? (
        <Text fontSize="md" fontWeight="semibold">
          {error.data.message}
        </Text>
      ) : (
        <ImageGallery
          items={images}
          infinite={true}
          showBullets={true}
          showNav={true}
          showThumbnails={false}
          showFullscreenButton={false}
          showPlayButton={false}
          showIndex={false}
          autoPlay={true}
          slideDuration={1000}
          slideInterval={5000}
          lazyLoad={true}
        />
      )}
    </HStack>
  );
}
