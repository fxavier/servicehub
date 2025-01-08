'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Star,
	MapPin,
	Clock,
	Filter,
	Search,
	ChevronLeft,
	ChevronRight,
} from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { providers } from './data';
import { categories } from '../categories/data';

const ITEMS_PER_PAGE = 5;

export default function ProvidersPage() {
	const searchParams = useSearchParams();
	const categoryParam = searchParams.get('category');

	const [searchTerm, setSearchTerm] = useState('');
	const [selectedCategory, setSelectedCategory] = useState(categoryParam || '');
	const [selectedLocation, setSelectedLocation] = useState('');
	const [priceRange, setPriceRange] = useState({ min: '', max: '' });
	const [currentPage, setCurrentPage] = useState(1);

	const filteredProviders = providers.filter((provider) => {
		const matchesSearch =
			provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			provider.title.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesCategory =
			!selectedCategory || provider.categories.includes(selectedCategory);
		const matchesLocation =
			!selectedLocation || provider.location === selectedLocation;
		const matchesPriceRange =
			(!priceRange.min || provider.hourlyRate >= Number(priceRange.min)) &&
			(!priceRange.max || provider.hourlyRate <= Number(priceRange.max));

		return (
			matchesSearch && matchesCategory && matchesLocation && matchesPriceRange
		);
	});

	const totalPages = Math.ceil(filteredProviders.length / ITEMS_PER_PAGE);
	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
	const paginatedProviders = filteredProviders.slice(
		startIndex,
		startIndex + ITEMS_PER_PAGE
	);

	useEffect(() => {
		setCurrentPage(1);
	}, [searchTerm, selectedCategory, selectedLocation, priceRange]);

	//const locations = [...new Set(providers.map(p => p.location))]
	const locations = Array.from(new Set(providers.map((p) => p.location)));

	return (
		<div className='container py-8'>
			<div className='mb-8'>
				<h1 className='text-4xl font-bold mb-4'>Encontre Profissionais</h1>
				<div className='flex gap-4'>
					<div className='flex-1'>
						<div className='relative'>
							<Search className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
							<Input
								placeholder='Pesquisar por nome ou serviço...'
								className='pl-9'
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
						</div>
					</div>
					<Button>Pesquisar</Button>
				</div>
			</div>

			<div className='flex flex-col md:flex-row gap-6'>
				<div className='w-full md:w-64 space-y-4'>
					<Card className='p-4'>
						<h2 className='font-semibold mb-4 flex items-center gap-2'>
							<Filter className='h-4 w-4' /> Filtros
						</h2>
						<div className='space-y-4'>
							<div>
								<label className='text-sm font-medium mb-2 block'>
									Localização
								</label>
								<Select
									value={selectedLocation}
									onValueChange={setSelectedLocation}
								>
									<SelectTrigger>
										<SelectValue placeholder='Selecione local' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='all'>Todos</SelectItem>
										{locations.map((location) => (
											<SelectItem key={location} value={location}>
												{location}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>

							<div>
								<label className='text-sm font-medium mb-2 block'>
									Categoria
								</label>
								<Select
									value={selectedCategory}
									onValueChange={setSelectedCategory}
								>
									<SelectTrigger>
										<SelectValue placeholder='Selecione categoria' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='all'>Todas</SelectItem>
										{categories.map((category) => (
											<SelectItem key={category.name} value={category.name}>
												{category.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>

							<div>
								<label className='text-sm font-medium mb-2 block'>
									Faixa de Preço (MT/hora)
								</label>
								<div className='flex gap-2'>
									<Input
										placeholder='Min'
										type='number'
										value={priceRange.min}
										onChange={(e) =>
											setPriceRange((prev) => ({
												...prev,
												min: e.target.value,
											}))
										}
									/>
									<Input
										placeholder='Max'
										type='number'
										value={priceRange.max}
										onChange={(e) =>
											setPriceRange((prev) => ({
												...prev,
												max: e.target.value,
											}))
										}
									/>
								</div>
							</div>

							<Button
								className='w-full'
								variant='outline'
								onClick={() => {
									setSearchTerm('');
									setSelectedCategory('');
									setSelectedLocation('');
									setPriceRange({ min: '', max: '' });
								}}
							>
								Limpar Filtros
							</Button>
						</div>
					</Card>
				</div>

				<div className='flex-1 space-y-6'>
					{paginatedProviders.length === 0 ? (
						<Card className='p-8 text-center'>
							<p className='text-muted-foreground mb-4'>
								Nenhum profissional encontrado com os filtros selecionados.
							</p>
							<Button
								variant='outline'
								onClick={() => {
									setSearchTerm('');
									setSelectedCategory('');
									setSelectedLocation('');
									setPriceRange({ min: '', max: '' });
								}}
							>
								Limpar Filtros
							</Button>
						</Card>
					) : (
						<>
							{paginatedProviders.map((provider) => (
								<Card key={provider.id} className='p-6'>
									<div className='flex flex-col md:flex-row gap-6'>
										<div className='relative w-full md:w-48 h-48'>
											<Image
												src={provider.image}
												alt={provider.name}
												fill
												className='object-cover rounded-lg'
											/>
										</div>
										<div className='flex-1'>
											<div className='flex items-start justify-between mb-2'>
												<div>
													<h3 className='text-xl font-semibold'>
														{provider.name}
													</h3>
													<p className='text-muted-foreground'>
														{provider.title}
													</p>
												</div>
												<div className='text-right'>
													<p className='font-semibold'>
														MT{provider.hourlyRate}/hora
													</p>
													<p className='text-sm text-green-600'>
														{provider.availability}
													</p>
												</div>
											</div>

											<div className='flex items-center gap-4 mb-4'>
												<div className='flex items-center gap-1'>
													<Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
													<span className='font-medium'>{provider.rating}</span>
													<span className='text-muted-foreground'>
														({provider.reviews} avaliações)
													</span>
												</div>
												<div className='flex items-center gap-1 text-muted-foreground'>
													<MapPin className='h-4 w-4' />
													<span>{provider.location}</span>
												</div>
												<div className='flex items-center gap-1 text-muted-foreground'>
													<Clock className='h-4 w-4' />
													<span>{provider.availability}</span>
												</div>
											</div>

											<p className='text-muted-foreground mb-4'>
												{provider.description}
											</p>

											<div className='flex flex-wrap gap-2 mb-4'>
												{provider.categories.map((category) => (
													<span
														key={category}
														className='px-3 py-1 bg-secondary rounded-full text-sm'
													>
														{category}
													</span>
												))}
											</div>

											<div className='flex gap-4'>
												<Button className='flex-1'>Agendar Agora</Button>
												<Button variant='outline' className='flex-1'>
													Ver Perfil
												</Button>
											</div>
										</div>
									</div>
								</Card>
							))}

							<div className='flex justify-center items-center gap-4 mt-8'>
								<Button
									variant='outline'
									onClick={() =>
										setCurrentPage((prev) => Math.max(1, prev - 1))
									}
									disabled={currentPage === 1}
								>
									<ChevronLeft className='h-4 w-4 mr-2' />
									Anterior
								</Button>
								<div className='flex items-center gap-2'>
									{Array.from({ length: totalPages }, (_, i) => i + 1).map(
										(page) => (
											<Button
												key={page}
												variant={currentPage === page ? 'default' : 'outline'}
												className='w-10 h-10 p-0'
												onClick={() => setCurrentPage(page)}
											>
												{page}
											</Button>
										)
									)}
								</div>
								<Button
									variant='outline'
									onClick={() =>
										setCurrentPage((prev) => Math.min(totalPages, prev + 1))
									}
									disabled={currentPage === totalPages}
								>
									Próximo
									<ChevronRight className='h-4 w-4 ml-2' />
								</Button>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
}
