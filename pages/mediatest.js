import dynamic from "next/dynamic";

const Mediatest = () => {

    const CloverIIIF = dynamic(() => import("@samvera/clover-iiif"), {
        ssr: false,
    });

    const id = "https://digital.lib.utk.edu/assemble/manifest/heilman/1187";

    return <CloverIIIF id={id} />;
}

export default Mediatest;
