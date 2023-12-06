import { FaStar,FaRegStar,FaStarHalfAlt } from "react-icons/fa";


const RatingStar = ({item}) => {
  return (
	<div className="d-flex justify-content-between">
		<div>
			<span className="rating">
				{item.rating >= 1 ? <FaStar/>: item.rating>=0.5 ? <FaStarHalfAlt/>:<FaRegStar/>}
			</span>
			<span className="rating">
				{item.rating >= 2 ? <FaStar/>: item.rating>=1.5 ? <FaStarHalfAlt/>:<FaRegStar/>}
			</span>
			<span className="rating">
				{item.rating >= 3 ? <FaStar/>: item.rating>=2.5 ? <FaStarHalfAlt/>:<FaRegStar/>}
			</span>
			<span className="rating">
				{item.rating >= 4 ? <FaStar/>: item.rating>=3.5 ? <FaStarHalfAlt/>:<FaRegStar/>}
			</span>
			<span className="rating">
				{item.rating >= 5? <FaStar/>: item.rating>=4.5 ? <FaStarHalfAlt/>:<FaRegStar/>}
			</span>
		</div>
		<div>
			<span className="rating-text"> {item.numReviews} Reviewers</span>
		</div>
	</div>
  )
  }

export default RatingStar
