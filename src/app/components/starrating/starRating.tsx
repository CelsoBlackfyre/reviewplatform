import { LiaStarSolid } from "react-icons/lia";
import { LiaStar } from "react-icons/lia";

export interface Props {
    rating: number;
}

export default function StarRating(props: Props) {
    const numStars = Math.round(props.rating / 2);
    const fullStars = [];
    const emptyStars = [];

    for (let i = 0; i < 5; i++) {
        if (i < numStars) {
            fullStars.push(i);
        } else {
            emptyStars.push(i);
        }
    }

    return (
        <div className="flex">
            {fullStars.map(index => (
                <LiaStarSolid key={index} />
            ))}
            {emptyStars.map(index => (
                <LiaStar key={index} />
            ))}
        </div>
    );
}
