import { useRouter } from "next/router";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import HeaderComponent from "../../Components/Header";
import useUserContext from "../../Hooks/useUserContext";
import { ImBooks } from "react-icons/im";
import { BsBookshelf, BsFillChatSquareFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FaUserFriends } from "react-icons/Fa";
import { Button } from "../../Components/util/Button";
import { CardComponent } from "../../Components/util/Card";
import { Posts } from "@prisma/client";
import { PostComponent } from "../../Components/Post";
import { ListTypeBook } from "../../Components/Profile/listTypeBook";
import useFollowContext from "../../Hooks/useFollowContext";
import { BooksCoverComponent } from "../../Components/util/booksCover";
import { AiTwotoneTrophy } from "react-icons/ai";
import { NoRegisterComponent } from "../../Components/util/noRegister";

export default function Profile() {
  const {
    query: { id },
  } = useRouter();

  const {
    getProfile,
    profile,
    user,
    loadingProfile,
    getPagesRead,
    getAveragePages,
    getLongestBook,
    getShortestBook,
    getLastRead,
  } = useUserContext();
  const { follow, unfollow } = useFollowContext();
  const [type, setType] = useState("stats");

  const stats = type.includes("stats");
  const booksList = type.includes("books");
  const postsList = type.includes("posts");
  const friendList = type.includes("friends");

  useEffect(() => {
    getProfile(id.toString());
  }, []);

  const router = useRouter();

  const followerFilter =
    user?.following?.filter((follow) => follow?.followingId === profile?.id)
      .length > 0;

  const booksProfileRead = profile?.Books?.filter(
    (book) => book.listType === "Read"
  );

  return (
    <div className="w-[100%] bg-bg-gray min-h-screen pb-[5rem]">
      <HeaderComponent />
      <div className="bg-blue-900 h-[250px]">
        <div
          className="absolute bg-white h-32 w-32 rounded-full top-44 left-[4.0rem] flex justify-center
        items-center"
        >
          {loadingProfile ? (
            <div className="bg-gray-300 h-[7.5rem] w-[7.5rem] rounded-full top-44 left-10 animate-pulse" />
          ) : (
            <img
              src={profile?.image}
              alt=""
              className="h-[7.5rem] w-[7.5rem] rounded-full top-44 left-10"
            />
          )}
        </div>
        <div className="absolute top-[12.5rem] left-[220px] flex justify-between w-[60%]">
          <p className=" text-white font-semibold  text-2xl ">
            {profile?.username}
          </p>
          {user?.id != profile?.id ? (
            <button
              className={`text-white font-semibold py-1 px-2 rounded-md border-2 border-white`}
              onClick={() => {
                if (followerFilter) {
                  unfollow(profile?.id, user?.id);
                } else {
                  follow(profile?.id, user?.id);
                }
              }}
            >
              {followerFilter ? `Unfollow` : `Follow`}
            </button>
          ) : null}
        </div>
        <div className="flex justify-center items-center space-x-3 absolute top-[16.5rem] left-[226px]">
          <Button
            icon={
              <CgProfile
                size={23}
                className={stats ? "text-blue-800 scale-125" : "text-gray-300"}
              />
            }
            className={`flex justify-center items-center space-x-[0.50rem]`}
            onClick={() => setType("stats")}
            titleClassname={stats ? "text-blue-800" : "text-gray-300"}
          />
          <Button
            title={profile?.Books?.length.toString()}
            icon={
              <BsBookshelf
                size={20}
                className={
                  booksList ? "text-blue-800 scale-125" : "text-gray-300"
                }
              />
            }
            className={`flex justify-center items-center space-x-[0.50rem]`}
            onClick={() => setType("books")}
            titleClassname={booksList ? "text-blue-800" : "text-gray-300"}
          />
          <Button
            title={profile?.Posts?.length}
            icon={
              <BsFillChatSquareFill
                size={20}
                className={`mt-1 text-md ${
                  postsList ? "text-blue-800 scale-125" : "text-gray-300"
                }`}
              />
            }
            className={`flex justify-center items-center space-x-[0.60rem]`}
            onClick={() => setType("posts")}
            titleClassname={`text-md
              ${postsList ? "text-blue-800" : "text-gray-300"}
            `}
          />
          <Button
            title={profile?.followedBy?.length}
            icon={
              <FaUserFriends
                size={24}
                className={
                  friendList ? "text-blue-800 scale-125" : "text-gray-300"
                }
              />
            }
            className={`flex justify-center items-center space-x-[0.55rem]`}
            titleClassname={`text-md
              ${friendList ? "text-blue-800" : "text-gray-300"}`}
            onClick={() => setType("friends")}
          />
        </div>
      </div>
      {stats ? (
        <>
          <p className="w-[84%] m-auto mt-20 text-3xl font-bold">Bio</p>
          <CardComponent classname="mt-5 flex w-[100%] bg-white">
            <div className="w-[45%]">
              <div className="flex space-x-3 w-[100%]">
                <p className="font-semibold w-[50%]">Books read:</p>
                <p className="italic ">{booksProfileRead?.length}</p>
              </div>
              <div className="flex space-x-3 w-[100%]">
                <p className="font-semibold w-[50%]">Average pages:</p>
                <p className="italic ">
                  {getAveragePages(booksProfileRead)
                    ? getAveragePages(booksProfileRead)
                    : 0}
                </p>
              </div>
              <div className="flex space-x-3 w-[100%]">
                <p className="font-semibold w-[50%]">Pages read:</p>
                <p className="italic ">{getPagesRead(booksProfileRead)}</p>
              </div>
              <div className="mt-3 space-y-3">
                <p className="font-semibold">Achievements:</p>
                <div className="flex items-start space-x-5">
                  <div className="flex flex-col justify-center items-center">
                    <AiTwotoneTrophy
                      size={30}
                      color={
                        getPagesRead(booksProfileRead) <= 500
                          ? "#d9d7d7"
                          : getPagesRead(booksProfileRead) > 500 &&
                            getPagesRead(booksProfileRead) <= 1000
                          ? "#80724b"
                          : getPagesRead(booksProfileRead) > 1000 &&
                            getPagesRead(booksProfileRead) <= 2500
                          ? "#aadb9e"
                          : getPagesRead(booksProfileRead) > 2500 &&
                            getPagesRead(booksProfileRead) <= 10000
                          ? "#fcba03"
                          : getPagesRead(booksProfileRead) > 10000
                          ? "#4fd9e0"
                          : null
                      }
                    />
                    <p className="italic text-[12px] text-gray-400">
                      {getPagesRead(booksProfileRead) <= 500
                        ? ""
                        : getPagesRead(booksProfileRead) > 500 &&
                          getPagesRead(booksProfileRead) <= 1000
                        ? "+500 pgs"
                        : getPagesRead(booksProfileRead) > 1000 &&
                          getPagesRead(booksProfileRead) <= 5000
                        ? "+1000 pgs"
                        : getPagesRead(booksProfileRead) > 5000 &&
                          getPagesRead(booksProfileRead) <= 10000
                        ? "+2500 pgs"
                        : getPagesRead(booksProfileRead) > 10000
                        ? "+10.000 pgs"
                        : null}
                    </p>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <ImBooks
                      size={30}
                      color={
                        booksProfileRead?.length < 5
                          ? "#d9d7d7"
                          : booksProfileRead?.length >= 5 &&
                            booksProfileRead?.length <= 20
                          ? "#80724b"
                          : booksProfileRead?.length > 25 &&
                            booksProfileRead?.length <= 50
                          ? "#aadb9e"
                          : booksProfileRead?.length > 100 &&
                            booksProfileRead?.length <= 500
                          ? "#fcba03"
                          : booksProfileRead?.length > 500
                          ? "#4fd9e0"
                          : null
                      }
                    />
                    <p className="italic text-[12px] text-gray-400">
                      {booksProfileRead?.length < 5
                        ? ""
                        : booksProfileRead?.length >= 5 &&
                          booksProfileRead?.length <= 20
                        ? "+5 books"
                        : booksProfileRead?.length > 25 &&
                          booksProfileRead?.length <= 50
                        ? "+25 books"
                        : booksProfileRead?.length > 100 &&
                          booksProfileRead.length <= 500
                        ? "+100 books"
                        : getPagesRead(booksProfileRead) > 500
                        ? "+500 books"
                        : null}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {booksProfileRead?.length > 0 ? (
              <div className="flex justify-start items-center space-x-3">
                <BooksCoverComponent
                  element={getLastRead(booksProfileRead)}
                  text={"Lasted Read"}
                />
                <BooksCoverComponent
                  element={getLongestBook(booksProfileRead)}
                  text={"Longest Book"}
                />
                <BooksCoverComponent
                  element={getShortestBook(booksProfileRead)}
                  text={"Shortest Book"}
                />
              </div>
            ) : (
              <NoRegisterComponent text={"books"} />
            )}
          </CardComponent>
        </>
      ) : null}
      {booksList ? (
        <>
          <p className="w-[84%] m-auto mt-20 text-3xl font-bold">BookShelve</p>

          {profile?.Books.length == 0 ? (
            <CardComponent classname="mt-5 bg-white">
              <div className="w-[100%] h-[100%] justify-center items-center">
                <p className="w-[100%]  h-[100%] text-center text-lg text-gray-400 ">
                  {`No books register yet`}
                </p>
              </div>
            </CardComponent>
          ) : booksProfileRead?.length > 0 ? (
            <ListTypeBook type="Read" list={booksProfileRead} />
          ) : null}
          {profile?.Books?.filter(
            (book) => book.listType === "Currently Reading"
          ).length > 0 ? (
            <ListTypeBook
              type="Currently Reading"
              list={profile?.Books?.filter(
                (book) => book.listType === "Currently Reading"
              )}
            />
          ) : null}
          {profile?.Books?.filter((book) => book.listType === "Want to Read")
            .length > 0 ? (
            <ListTypeBook
              type="Want to Read"
              list={profile?.Books?.filter(
                (book) => book.listType === "Want to Read"
              )}
            />
          ) : null}
        </>
      ) : postsList ? (
        profile?.Posts.length === 0 ? (
          <>
            <p className="w-[84%] m-auto mt-20 text-3xl font-bold">Feed</p>
            <CardComponent classname="mt-5 bg-white">
              <div className="w-[100%] h-[100%] justify-center items-center">
                <p className="w-[100%]  h-[100%] text-center text-lg text-gray-400 ">
                  {`No posts register yet`}
                </p>
              </div>
            </CardComponent>
          </>
        ) : (
          <>
            <p className="w-[84%] m-auto mt-20 text-3xl font-bold">Feed</p>
            <div className="mt-5 space-y-3">
              {profile?.Posts?.map((post: Posts) => {
                return <PostComponent key={post?.id} post={post} />;
              })}
            </div>
          </>
        )
      ) : friendList ? (
        <>
          <p className="w-[84%] m-auto mt-20 text-3xl font-bold">Followers</p>
          <CardComponent classname="mt-5 bg-white space-y-3">
            <div className="flex justify-start items-start space-x-3 ">
              {profile?.followedBy.length === 0 ? (
                <p className="w-[100%] text-center text-lg text-gray-400">
                  {profile?.username} doesnt have any followers{" "}
                </p>
              ) : (
                profile?.followedBy?.map((follow, i) => {
                  return (
                    <div
                      key={i}
                      className={`flex flex-col justify-start items-start`}
                    >
                      {loadingProfile ? (
                        <div className="bg-gray-300 h-[3.5rem] w-[3.5rem] rounded-full top-44 left-10 animate-pulse" />
                      ) : (
                        <img
                          src={follow?.follower?.image}
                          className="h-[4.5rem] w-[4.5rem] rounded-full top-44 left-10 cursor-pointer"
                          onClick={() => {
                            router.push(`/profile/${follow?.follower?.id}`);
                          }}
                          alt={follow?.follower?.username}
                        />
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </CardComponent>
        </>
      ) : null}
    </div>
  );
}
