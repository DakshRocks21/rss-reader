// Chin Ray wrote this

import { CiGlobe } from "react-icons/ci";
import styles from "./page.module.css";
import { Checkbox } from "./Checkbox";

// Already subscribed interests section (pull from Firebase)
export function RenderSubscribedInterests({ feeds, filter }) {
    return (
        <>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Subscribed Interests</h2>
            <div className="flex flex-row flex-wrap">
                {feeds.map((feed) => (
                    (filter.length === 0 || feed.categories.some(category => filter.includes(category))) ? (
                        <div className={`bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200 w-fit max-w-2xl mr-6 flex items-center`} key={feed.url}>
                            <div className={styles.container}>
                                {feed.name && feed.name != "" ? (
                                    <>
                                        {
                                            feed.image && feed.image != "" ? (
                                                <img src={feed.image} alt={feed.name} className={styles["image"]} />
                                            ) : (
                                                <CiGlobe className={styles["image"]} />
                                            )
                                        }
                                        <div className={styles.centrediv}>
                                            <h3 className={styles.interestname}>{feed.name}</h3>
                                            <p className={styles.description}>{feed.description}</p>
                                            <p>{feed.url}</p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <CiGlobe className={styles["image"]} />
                                        <div className={styles.centrediv}>
                                            <h3 className={styles.interestname}>{feed.url.toString().replace("https://", "").split("/")[0].split(".").slice(-2).join(".")}</h3>
                                            <p>{feed.url}</p>
                                        </div>
                                    </>
                                )}

                                <div className={styles.rightalign}>
                                    <Checkbox feed={feed} feeds={feeds} />
                                </div>
                            </div>
                        </div>
                    ) : null
                ))}
            </div>
        </>
    )
}

// Preset interests selection section
export function RenderInterestSelection({ presetFeeds, filter }) {
    return (
        <>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Available Interests</h2>
            <div className="flex flex-row flex-wrap">
                {
                    presetFeeds.map((feed) => (
                        (filter.length === 0 || feed.categories.some(category => filter.includes(category))) ? (
                            <div className={`bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200 w-fit max-w-2xl mr-6 flex items-center`} key={feed.url}>
                                <div className={styles.container}>
                                    <img src={feed.image} alt={feed.name} className={styles["image"]} />
                                    <div className={styles.centrediv}>
                                        <h3 className={styles.interestname}>{feed.name}</h3>
                                        <p className={styles.description}>{feed.description}</p>
                                        <p>{feed.url}</p>
                                    </div>
                                    <div className={styles.centrediv}>
                                        <Checkbox feed={feed} feeds={presetFeeds} />
                                    </div>
                                </div>
                            </div>
                        ) : null
                    ))
                }
            </div>
        </>
    )
}