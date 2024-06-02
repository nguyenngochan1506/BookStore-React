
const BreadCumbs = ({currentPage}) => {
  return (
    <div className="container mx-auto">
    <div className="text-sm breadcrumbs mb-5">
        <ul>
            <li><a href="#">Trang Chủ</a></li>
            <li>{currentPage}</li>
        </ul>
    </div>
</div>
  )
}

export default BreadCumbs;