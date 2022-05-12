import Image from "../components/image";

const Home = ({ content }) => {
  return (
    <div className="bg-gray-200 sm:p-16 lg:p-32 p-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 md:gap-10 gap-5">
        {content.results.map((character) => {
          const { id, name, image, status, type, gender } = character;

          return (
            <div key={id} className="bg-white rounded-lg">
              <div className="rounded-t-lg overflow-hidden">
                <Image
                  src={image}
                  width={300}
                  height={300}
                  layout="responsive"
                />
              </div>
              <div className="mx-4 my-4">
                <h2 className="font-bold text-xl text-gray-900">{name}</h2>
                <p className="text-md text-gray-600">Status : {status}</p>
                <p className="text-md text-gray-600">Gender : {gender}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const res = await fetch("https://rickandmortyapi.com/api/character/");
  const content = await res.json();

  return {
    props: {
      content,
    },
  };
}

export default Home;
