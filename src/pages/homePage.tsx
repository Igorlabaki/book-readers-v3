import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import HeaderComponent from "../Components/Header";
import { useEffect, useState } from "react";
import useUserContext from "../Hooks/useUserContext";
import { InputPostComponent } from "../Components/inputPost";
import { MostListsComponent } from "../Components/Home/mostLists";
import { FeedComponent } from "../Components/Home/feed";
import { CardComponent } from "../Components/util/Card";
import usePostsContext from "../Hooks/usePostsContext";
import { useRouter } from "next/router";
import { FiSearch } from "react-icons/fi";
import { Button } from "../Components/util/Button";
import useFollowContext from "../Hooks/useFollowContext";

export default function HomePage({ data }) {
  const userId = data.id;

  const { getUser, getAllUser, user, allUser } = useUserContext();
  const { follow, unfollow } = useFollowContext();

  const [search, setSearch] = useState("");

  useEffect(() => {
    getUser(userId);
    getAllUser();
  }, []);

  const router = useRouter();
  const filterList = allUser?.filter((profile) =>
    profile.username.includes(search)
  );

  return (
    <div className="w-[100%] bg-bg-gray py-20 space-y-3 min-h-screen">
      <HeaderComponent />
      <div className="lg:w-[60%] m-auto space-y-3 flex justify-center items-center flex-col">
        <MostListsComponent />
        <CardComponent>
          <div className={`flex flex-col space-y-4`}>
            <div className="flex space-x-2 justify-start items-center">
              <div className="bg-bg-gray rounded-md outline-none px-2 py-1 flex justify-start items-center w-[100%]">
                <FiSearch fontSize={15} className={`text-gray-400`} />
                <input
                  placeholder=" Search your friends"
                  type="text"
                  className="bg-transparent  outline-none ml-2"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className={`flex space-x-4`}>
              {filterList?.length === 0 ? (
                <p className="text-center w-[100%] text-gray-500 font-semibold h-[90px] flex justify-center items-center">
                  Sorry we didnt find anyone
                </p>
              ) : (
                filterList?.map((profile) => {
                  if (profile?.id === user?.id) {
                    return;
                  }
                  const followerFilter =
                    user?.following?.filter(
                      (follow) => follow?.followingId === profile?.id
                    ).length > 0;
                  return (
                    <div
                      key={profile.id}
                      className={`flex flex-col space-y-1 justify-center items-center cursor-pointer`}
                    >
                      <img
                        src={profile.image}
                        alt=""
                        className="h-14 w-14 rounded-full"
                        onClick={() => router.push(`/profile/${profile.id}`)}
                      />
                      <p onClick={() => router.push(`/profile/${profile.id}`)}>
                        {profile.username}
                      </p>
                      <Button
                        title={followerFilter ? `Unfollow` : `Follow`}
                        className={` bg-blue-900 text-white font-semibold py-1 px-2 rounded-md border-2 border-white`}
                        onClick={() => {
                          if (followerFilter) {
                            unfollow(profile?.id, user?.id);
                          } else {
                            follow(profile?.id, user?.id);
                          }
                        }}
                      />
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </CardComponent>
        <FeedComponent />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  const user = session?.user;

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }

  return {
    props: {
      data: user,
    },
  };
};
