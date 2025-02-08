import { CiGlobe } from "react-icons/ci";
import styles from "./page.module.css";
import { RenderCheckbox } from "./Checkbox";
import { FaSearch, FaRegSadTear } from "react-icons/fa";

// Already subscribed interests section (pull from Firebase)
export function RenderSubscribedInterests({ feeds, filter }) {
    return (
        <>
            <h2 className="text-lg font-semibold text-on-surface mb-4">Subscribed Interests</h2>
            {feeds.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
                    {feeds.map((feed) => (
                        (filter.length === 0 || feed.categories.some(category => filter.includes(category))) ? (
                            <div className={`bg-surface-bright p-6 rounded-lg shadow-md mb-6 border border-gray-200 w-fit max-w-2xl mr-6 flex items-center`} key={feed.url}>
                                <div className={styles.container}>
                                    {feed.name && feed.name != "" ? (
                                        <>
                                            {
                                                feed.image && feed.image != "" ? (
                                                    <img src={feed.image} alt={feed.name} className={styles["image"]} />
                                                ) : (
                                                    <CiGlobe className={`${styles["image"]} text-on-surface`} />
                                                )
                                            }
                                            <div className={styles.centrediv}>
                                                <h3 className={`${styles.interestname} text-on-surface`}>{feed.name}</h3>
                                                <p className={`${styles.description} text-on-surface`}>{feed.description}</p>
                                                <p className="text-on-surface">{feed.url}</p>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <CiGlobe className={`${styles["image"]} text-on-surface`} />
                                            <div className={styles.centrediv}>
                                                <h3 className={`${styles.interestname} text-on-surface`}>{feed.url.toString().replace("https://", "").split("/")[0].split(".").slice(-2).join(".")}</h3>
                                                <p className="text-on-surface">{feed.url}</p>
                                            </div>
                                        </>
                                    )}

                                    <div className={styles.rightalign}>
                                        <RenderCheckbox feed={feed} feeds={feeds} />
                                    </div>
                                </div>
                            </div>
                        ) : null
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-60 w-full text-center bg-surface-container-low rounded-lg shadow-md p-6">
                    <FaRegSadTear className="text-6xl text-on-surface-variant mb-4" />
                    <h2 className="text-2xl font-semibold text-on-surface">
                        No Subscribed Interests Found
                    </h2>
                    <p className="text-md text-on-surface-variant mt-2">
                        Your custom feeds will appear here.
                    </p>
                </div>
            )}
        </>
    );
}

// Preset interests selection section
export function RenderInterestSelection({ presetFeeds, filter }) {
    return (
        <>
            <h2 className="text-lg font-semibold text-on-surface mb-4">Available Interests</h2>
            <div className="flex flex-row flex-wrap">
                {
                    presetFeeds.map((feed) => (
                        (filter.length === 0 || feed.categories.some(category => filter.includes(category))) ? (
                            <div className={`bg-surface-bright p-6 rounded-lg drop-shadow-md mb-6 w-fit max-w-2xl mr-6 flex items-center`} key={feed.url}>
                                <div className={styles.container}>
                                    <img src={feed.image} alt={feed.name} className={styles["image"]} />
                                    <div className={styles.centrediv}>
                                        <h3 className={`${styles.interestname} text-on-surface`}>{feed.name}</h3>
                                        <p className={`${styles.description} text-on-surface`}>{feed.description}</p>
                                        <p className="text-on-surface">{feed.url}</p>
                                    </div>
                                    <div className={styles.centrediv}>
                                        <RenderCheckbox feed={feed} feeds={presetFeeds} />
                                    </div>
                                </div>
                            </div>
                        ) : null
                    ))
                }
            </div>
        </>
    );
}
