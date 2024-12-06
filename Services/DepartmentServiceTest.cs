using Aries.Models.ViewModels;
using Aries.Repositories.Interfaces;
using Aries.Services.Implementations;
using Moq;
using Microsoft.Extensions.Logging;
using Aries.Models.Entities;

namespace AriesTest.Services
{
    /**
     *  Tests for department service
     *  Using Moq to avoid using actual database
     *  Test by creating mock object, call the service method and verify the result
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

        [Fact]
        public async Task GetAllAsync_ShouldReturnDepartments()
        {
            // Mock data
            var departments = new List<DepartmentViewModel>
            {
                new DepartmentViewModel { Id = 1, Name = "HR" },
                new DepartmentViewModel { Id = 2, Name = "IT" }
            };
            _mockDepartmentRepository.Setup(repo => repo.GetDepartmentsAsync())
                .ReturnsAsync(departments);

            var result = await _departmentService.GetAllAsync();

            // Should have 2 departments and call GetDepartmentsAsync once
            Assert.NotNull(result);
            Assert.Equal(2, result.Count());
            _mockDepartmentRepository.Verify(repo => repo.GetDepartmentsAsync(), Times.Once);
        }

        [Fact]
        public async Task GetByIdAsync_ShouldReturnDepartment_WhenIdExists()
        {
            // Mock data
            var department = new Department { Id = 1, Name = "HR" };
            _mockDepartmentRepository.Setup(repo => repo.GetByIdAsync(1))
                .ReturnsAsync(department);

            var result = await _departmentService.GetByIdAsync(1);

            // Should have HR department and call GetByIdAsync once
            Assert.NotNull(result);
            Assert.Equal(1, result.Id);
            Assert.Equal("HR", result.Name);
            _mockDepartmentRepository.Verify(repo => repo.GetByIdAsync(1), Times.Once);
        }

        [Fact]
        public async Task GetByIdAsync_ShouldReturnFalse_WhenIdNotExist()
        {
            var result = await _departmentService.GetByIdAsync(1);

            Assert.Null(result);
            _mockDepartmentRepository.Verify(repo => repo.GetByIdAsync(1), Times.Once);
        }
    }
}