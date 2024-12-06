using Aries.Repositories.Interfaces;
using Aries.Services.Implementations;
using Moq;
using Microsoft.Extensions.Logging;

namespace AriesTest.Services
{
    /**
     *  Tests for department service
     *  Using Moq to avoid using actual database
     */
    public class DepartmentServiceTests
    {
        private readonly Mock<IDepartmentRepository> _mockDepartmentRepository;
        private readonly Mock<ILogger<DepartmentService>> _mockLogger;
        private readonly DepartmentService _departmentService;

        public DepartmentServiceTests()
        {
            _mockDepartmentRepository = new Mock<IDepartmentRepository>();
            _mockLogger = new Mock<ILogger<DepartmentService>>();
            _departmentService = new DepartmentService(_mockDepartmentRepository.Object, _mockLogger.Object);
        }
    }
}