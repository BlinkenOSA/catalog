const API = process.env.NEXT_PUBLIC_AMS_API;

export async function getServerSideProps(context) {
    const { reference_code } = context.params;

    const res = await fetch(`${API}archival-units/by-reference-code/${reference_code}/`)
    if (res.status === 200) {
        const data = await res.json()
        if (data) {
            return {
                redirect: {
                    destination: `/catalog/${data['catalog_id']}`,
                    permanent: false,
                },
            }
        }
    } else {
        return {
            notFound: true,
        }
    }
}

const ReferenceCodeHelper = () => {
    return ''
}

export default ReferenceCodeHelper;