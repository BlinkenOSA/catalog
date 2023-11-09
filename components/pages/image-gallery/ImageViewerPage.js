import dynamic from "next/dynamic";
import ImageHeader from "./parts/ImageHeader";
import ImageFooter from "./parts/ImageFooter";
import useSWR from "swr";
import {solrFetcher} from "../../../utils/fetcherFunctions";

const ImageViewerPage = ({selectedImage}) => {
	const { data, error } = useSWR({query: `id:${selectedImage}`}, solrFetcher);

	const ImageViewer = dynamic(() => import('../../catalog/finding-aids/parts/findingAidsDigitalContent/viewers/ImageViewer'), {
		ssr: false
	});

	return (
		<>
			<ImageHeader data={data} />
			<ImageViewer id={selectedImage} isGallery={true} />
			<ImageFooter data={data} />
		</>
	)
}

export default ImageViewerPage;