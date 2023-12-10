import style from './IsadPagination.module.scss'
import React, {useEffect, useState} from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import {useRouter} from "next/router";
import Button from "../../../../search/parts/Button";

const IsadPagination = ({containerNumber=1, containerCount, recordsCount, numFound, isMobile=false}) => {
	const router = useRouter();
	const {offset, view} = router.query;

	const [startingContainer, setStartingContainer] = useState('');
	const [total, setTotal] = useState(0)

	const DEFAULT_SIZE = 20;

	useEffect(() => {
			if (containerNumber) {
				setStartingContainer(Number(containerNumber))
			}
	}, [])

	useEffect(() => {
		if (numFound) {
			setTotal(Number(numFound))
		}
	}, [numFound])

	const onContainerChange = (number) => {
		const num = number > containerCount ? containerCount : number

		window.scrollTo(0, 0)
		router.replace({
			query: {...router.query, start: num}
		}, undefined, {shallow: true})
	}

	const handleShowAll = () => {
		window.scrollTo(0, 0)
		if (view === 'all') {
			delete router.query['view']
			router.replace({
				query: {...router.query}
			}, undefined, {shallow: true})
		} else {
			delete router.query['offset']
			router.replace({
				query: {...router.query, view: 'all'}
			}, undefined, {shallow: true})
		}
	}

	const getOffset = () => {
		return offset ? Number(offset) : 0
	}

	const getPageTo = () => {
		if (view === 'all') {
			return total
		} else {
			return getOffset() + DEFAULT_SIZE <= total ? getOffset() + DEFAULT_SIZE : total
		}
	}

	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			onContainerChange(startingContainer)
		}
	}

	const handleMinusButtonClick = () => {
		startingContainer > 1 && setStartingContainer(startingContainer - 1)
	}

	const handlePlusButtonClick = () => {
		startingContainer < containerCount && setStartingContainer(startingContainer + 1)
	}

	const handlePreviousClick = () => {
		window.scrollTo(0, 0)
		router.replace({
			query: {...router.query, offset: getOffset() - DEFAULT_SIZE}
		}, undefined, {shallow: true})
	}

	const handleNextClick = () => {
		window.scrollTo(0, 0)
		router.replace({
			query: {...router.query, offset: getOffset() + DEFAULT_SIZE}
		}, undefined, {shallow: true})
	}

	const renderContainerButton = () => {
		return (
			<div className={isMobile ? `${style.ContainerNumberInputWrapper} ${style.Mobile}` : style.ContainerNumberInputWrapper}>
				<button
					onClick={handleMinusButtonClick}
					className={style.MinusButton} >
					<AiOutlineMinus size={15} />
				</button>
				<input
					className={style.ContainerNumberInput}
					value={startingContainer}
					onKeyDown={handleKeyDown}
					onChange={(e) => setStartingContainer(Number(e.target.value) === 0 ? 1 : Number(e.target.value))}
					type={'number'}
					min="1"
					max={containerCount}
				/>
				<button
					onClick={handlePlusButtonClick}
					className={style.PlusButton} >
					<AiOutlinePlus size={15} />
				</button>
			</div>
		)
	}

	const renderStepButtons = () => {
		return (
			<div className={style.StepButtons}>
				<Button
					text={'< Previous'}
					onClick={handlePreviousClick}
					disabled={view === 'all' || getOffset() === 0}
				/>
				<div className={isMobile ? `${style.PaginationText} ${style.Mobile}` : style.PaginationText}>
					{
						isMobile ?
						`${getOffset() + 1} / ${getPageTo()} of ${total}` :
						`Showing ${getOffset() + 1} to ${getPageTo()} of ${total} entries`
					}
				</div>
				<Button
					text={'Next >'}
					onClick={handleNextClick}
					disabled={view === 'all' || getOffset() + DEFAULT_SIZE > total}
				/>
			</div>
		)
	}

	const handleClick = () => {
		onContainerChange(startingContainer)
	}

	const calcWidthPercentage = () => {
		if (view === 'all') {
			return 100
		} else {
			return recordsCount >= total ? 100 : (recordsCount / total) * 100
		}
	}

	const calcLeftPercentage = () => {
		if (view === 'all') {
			return 0
		} else {
			return (getOffset() / recordsCount) * 100
		}
	}

	if (isMobile) {
		return (
			<div className={`${style.PaginationWrapper} ${style.Mobile}`}>
				{renderStepButtons()}
				<div className={style.ShowAllButton}>
					<Button text={view === 'all' ? 'Show Paginated' : 'Show All'} onClick={handleShowAll} />
				</div>
				<div className={style.Meter}>
					<div className={style.MeterBackground}>
						<div
							className={style.MeterMarker}
							style={{
								width: `${calcWidthPercentage()}%`,
								transform: `translateX(${calcLeftPercentage()}%)`
							}}
						/>
					</div>
				</div>
			</div>
		)
	} else {
		return (
			<div className={style.PaginationWrapper}>
				<div className={style.Label}>
					From container:
				</div>
				{renderContainerButton()}
				<div className={style.GoButton}>
					<Button text={'GO'} onClick={handleClick} />
				</div>
				{renderStepButtons()}
				<div className={style.ShowAllButton}>
					<Button text={view === 'all' ? 'Show Paginated' : 'Show All'} onClick={handleShowAll} />
				</div>
				<div className={style.Meter}>
					<div className={style.MeterBackground}>
						<div
							className={style.MeterMarker}
							style={{
								width: `${calcWidthPercentage()}%`,
								transform: `translateX(${calcLeftPercentage()}%)`
							}}
						/>
					</div>
				</div>
			</div>
		)
	}

}

export default IsadPagination;