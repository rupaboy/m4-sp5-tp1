import { UseWorld } from '../../../hook/UseWorld';
import Button from './Button';

const MenuFinder = ({ setIsMenuOpen, setCurrentCountry }) => {

  const {
    setIsFinderOpen,
    resetFilters,
    countryFinder,
    continentCountryFinder,
    languageCountryFinder,
    continentLanguageCountryFinder
  } = UseWorld()

  return (
    <div className={`${'flex flex-col gap-10 sm:flex-row items-center justify-center h-full'}`}>

      <Button
        buttonText={<i className='bi-globe-americas text-slate-400' />}
        title={`Find Country By Continent`}
        ratio={'w-20'}
        buttonName={'Continent'}
        action={() => {
          resetFilters()
          setCurrentCountry(null)
          continentCountryFinder()
          setIsMenuOpen(false)
          setIsFinderOpen(true)
        }}
      />

      <Button
        buttonText={<i className='bi-globe text-slate-400' />}
        title={`Find Country By Continent > Language`}
        ratio={'w-20'}
        buttonName={'Continent/Language'}
        action={() => {
          resetFilters()
          setCurrentCountry(null)
          continentLanguageCountryFinder()
          setIsMenuOpen(false)
          setIsFinderOpen(true)
        }}
      />

      <Button
        buttonText={<i className='bi-translate text-slate-400' />}
        title={`Find Country By Language`}
        ratio={'w-20'}
        buttonName={'Language'}
        action={() => {
          resetFilters()
          setCurrentCountry(null)
          languageCountryFinder()
          setIsMenuOpen(false)
          setIsFinderOpen(true)
        }}
      />

      <Button
        buttonText={<i className='bi-alphabet-uppercase text-slate-400' />}
        title={`Find Country By Name`}
        ratio={'w-20'}
        buttonName={'Name'}
        action={() => {
          resetFilters()
          setCurrentCountry(null)
          countryFinder()
          setIsMenuOpen(false)
          setIsFinderOpen(true)
        }}
      />
    </div>
  )
}

export default MenuFinder