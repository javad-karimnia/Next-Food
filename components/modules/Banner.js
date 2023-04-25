import Link from "next/link";
import styles from "./Banner.module.css";
import Image from "next/image";

function Banner() {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h2>BotoFood</h2>
        <p>Food Delivery and Takeout!</p>
        <span>
          BotoFood is an online food ordering and delivery platform launched by
          Uber in 2014. Meals are delivered by couriers using cars, scooters,
          bikes, or on foot.
        </span>
        <Link href="/menu">See All</Link>
      </div>
      <div className={styles.right}>
        <Image src="/images/banner.png" alt="Food image" width={450} height={308.967}/>
      </div>
    </div>
  );
}

export default Banner;