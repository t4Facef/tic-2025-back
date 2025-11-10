import { VagasRepository } from "../repositories/vagas.repo";

interface JobData {
  idEmpresa: number;
  title: string;
  location: string;
  description: string;
  skillsTags: string[];
  supportTags: string[]; // Volta a ser strings (nomes das acessibilidades)
  startDate: Date;
  endDate: Date;
  typeContract: string;
  typeWork: string;
  payment: string;
  workLevel: string;
  timeShift: string;
  setor?: string;
}

interface VagasFilters {
  titulo?: string;
  localizacao?: string;
  tipoContrato?: string | string[];
  tipoTrabalho?: string | string[];
  nivelTrabalho?: string;
  turno?: string;
  empresaId?: string;
  habilidades?: string;
  apoios?: string;
  setor?: string;
  recomendadas?: boolean;
  candidatoId?: string;
  inscrito?: boolean;
}

interface VagasSearchFilters extends VagasFilters {
  habilidadesList?: string[];
  apoiosList?: string[];
  salarioMin?: number;
  salarioMax?: number;
  dataInicioMin?: string;
  dataInicioMax?: string;
  recomendadas?: boolean;
  candidatoId?: string;
  inscrito?: boolean;
  page?: number;
}

export const VagasService = {
  async list(filters?: VagasFilters) {
    return await VagasRepository.findAll(filters);
  },

  async findById(id: number) {
    return await VagasRepository.findById(id);
  },

  async findByEmpresa(empresaId: number, status?: string) {
    return await VagasRepository.findByEmpresa(empresaId, status);
  },

  async create(jobData: JobData) {
    const vagaData = {
      titulo: jobData.title,
      localizacao: jobData.location,
      descricao: jobData.description,
      habilidades: jobData.skillsTags,
      apoios: jobData.supportTags, // Volta a salvar strings diretamente
      dataInicio: jobData.startDate,
      dataFim: jobData.endDate,
      tipoContrato: jobData.typeContract,
      tipoTrabalho: jobData.typeWork,
      pagamento: jobData.payment,
      nivelTrabalho: jobData.workLevel,
      turno: jobData.timeShift,
      setor: jobData.setor,
      empresaId: jobData.idEmpresa,

    };
    return await VagasRepository.create(vagaData);
  },

  async update(id: number, jobData: any) {
    const updateData: any = {};
    
    // Atualizar campos mesmo se forem strings vazias (exceto para campos opcionais)
    if (jobData.title !== undefined) updateData.titulo = jobData.title;
    if (jobData.location !== undefined) updateData.localizacao = jobData.location;
    if (jobData.description !== undefined) updateData.descricao = jobData.description;
    if (jobData.skillsTags !== undefined) updateData.habilidades = jobData.skillsTags;
    if (jobData.supportTags !== undefined) updateData.apoios = jobData.supportTags;

    if (jobData.startDate !== undefined) updateData.dataInicio = jobData.startDate;
    if (jobData.endDate !== undefined) updateData.dataFim = jobData.endDate;
    if (jobData.typeContract !== undefined) updateData.tipoContrato = jobData.typeContract;
    if (jobData.typeWork !== undefined) updateData.tipoTrabalho = jobData.typeWork;
    if (jobData.payment !== undefined) updateData.pagamento = jobData.payment;
    if (jobData.workLevel !== undefined) updateData.nivelTrabalho = jobData.workLevel;
    if (jobData.timeShift !== undefined) updateData.turno = jobData.timeShift;
    if (jobData.setor !== undefined) updateData.setor = jobData.setor;
    
    // Permitir atualização direta do status
    if (jobData.status !== undefined) updateData.status = jobData.status;

    return await VagasRepository.update(id, updateData);
  },

  async delete(id: number) {
    return await VagasRepository.delete(id);
  },

  async search(filters?: VagasSearchFilters) {
    return await VagasRepository.search(filters || {});
  },

  async getRecomendadas(candidatoId: number) {
    const filters = { candidatoId: candidatoId.toString(), recomendadas: true };
    return await VagasRepository.findAll(filters);
  },

  async getTopEmpresasByVagas() {
    return await VagasRepository.getTopEmpresasByVagas();
  },

  async getVagasPopulares() {
    return await VagasRepository.getVagasPopulares();
  },
};